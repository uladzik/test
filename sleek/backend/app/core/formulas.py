from decimal import Decimal


def calculate_offer(
    listed_price: Decimal,
    offer_pct: float,
    condition_adjustment: float = 0.0,
    risk_adjustment: float = 0.0,
    min_offer_pct: float = 0.50,
    max_offer_pct: float = 0.80,
) -> Decimal:
    """
    recommended_offer = listed_price * clamp(offer_pct + condition_adj + risk_adj, min, max)
    """
    effective_pct = max(min_offer_pct, min(max_offer_pct, offer_pct + condition_adjustment + risk_adjustment))
    return (listed_price * Decimal(str(effective_pct))).quantize(Decimal("0.01"))


def calculate_expected_profit(
    offer_amount: Decimal,
    estimated_resale_value: Decimal,
    buy_platform_fee_pct: float = 0.0,
    sell_platform_fee_pct: float = 0.10,
    shipping_cost: Decimal = Decimal("5.00"),
) -> Decimal:
    """
    expected_profit = resale_value * (1 - sell_fee) - offer_amount * (1 + buy_fee) - shipping
    Accounts for fees on both buy and sell sides.
    """
    net_resale = estimated_resale_value * Decimal(str(1 - sell_platform_fee_pct))
    total_buy_cost = offer_amount * Decimal(str(1 + buy_platform_fee_pct))
    return (net_resale - total_buy_cost - shipping_cost).quantize(Decimal("0.01"))


def calculate_confidence(
    model_match_confidence: float,
    valuation_confidence: float,
    data_quality_score: float,
    image_quality_score: float,
) -> float:
    """
    Weighted average of sub-confidence scores.
    confidence = 0.35*model + 0.30*valuation + 0.20*data + 0.15*image
    """
    return round(
        0.35 * model_match_confidence
        + 0.30 * valuation_confidence
        + 0.20 * data_quality_score
        + 0.15 * image_quality_score,
        3,
    )


def calculate_risk(
    counterfeit_risk: float,
    condition_risk: float,
    seller_risk: float,
    data_quality_risk: float,
    price_anomaly: bool = False,
) -> float:
    """
    risk = 0.35*counterfeit + 0.25*condition + 0.20*seller + 0.15*data + 0.05*anomaly
    Higher = riskier (0.0 - 1.0)
    """
    anomaly_score = 1.0 if price_anomaly else 0.0
    return round(
        0.35 * counterfeit_risk
        + 0.25 * condition_risk
        + 0.20 * seller_risk
        + 0.15 * data_quality_risk
        + 0.05 * anomaly_score,
        3,
    )


def calculate_deal_score(
    expected_margin_pct: float,
    confidence_score: float,
    risk_score: float,
) -> float:
    """
    deal_score = min(margin_pct / 0.5, 1.0) * confidence * (1 - risk) * 100
    Result: 0.0 - 100.0
    """
    margin_component = min(expected_margin_pct / 0.50, 1.0) if expected_margin_pct > 0 else 0.0
    risk_component = 1.0 - risk_score
    raw = margin_component * confidence_score * risk_component * 100
    return round(max(0.0, min(100.0, raw)), 1)


def classify_recommendation(
    deal_score: float,
    confidence_score: float,
    risk_score: float,
    expected_margin: Decimal,
    min_margin: Decimal = Decimal("10.00"),
    buy_threshold: float = 60.0,
    review_threshold: float = 35.0,
    max_risk: float = 0.70,
    min_confidence: float = 0.40,
) -> str:
    """
    BUY:    deal_score >= 60 AND confidence >= 0.40 AND risk < 0.70 AND margin >= 10
    REVIEW: deal_score >= 35 OR confidence < 0.40 OR 0.50 <= risk < 0.70
    IGNORE: everything else
    """
    if expected_margin < min_margin:
        return "IGNORE"
    if risk_score >= max_risk:
        return "REVIEW"
    if confidence_score < min_confidence:
        return "REVIEW"
    if deal_score >= buy_threshold:
        return "BUY"
    if deal_score >= review_threshold:
        return "REVIEW"
    return "IGNORE"


# Condition adjustments for offer calculation
CONDITION_ADJUSTMENTS = {
    "NEW": 0.05,
    "LIKE_NEW": 0.02,
    "GOOD": 0.0,
    "FAIR": -0.05,
    "POOR": -0.10,
}

# Platform fee estimates (buy-side and sell-side)
PLATFORM_FEES = {
    "vinted": {"buy_fee": 0.0, "sell_fee": 0.05},
    "kleinanzeigen": {"buy_fee": 0.0, "sell_fee": 0.0},
    "depop": {"buy_fee": 0.0, "sell_fee": 0.10},
    "vestiaire": {"buy_fee": 0.0, "sell_fee": 0.15},
}

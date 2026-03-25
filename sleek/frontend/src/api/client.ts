const BASE_URL = '/api'

function getHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  const token = localStorage.getItem('token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: getHeaders(),
    ...options,
  })

  if (res.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/'
    throw new Error('Unauthorized')
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(error.detail || `HTTP ${res.status}`)
  }

  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  // Auth
  login: (username: string, password: string) =>
    request<{ access_token: string }>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username, password }),
    }),

  me: () => request<{ id: string; email: string; name: string; role: string }>('/auth/me'),

  // Dashboard
  dashboardStats: () => request<DashboardStats>('/analytics/dashboard'),

  // Opportunities
  opportunities: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return request<OpportunityListResponse>(`/opportunities${query}`)
  },

  opportunity: (id: string) => request<Opportunity>(`/opportunities/${id}`),

  approveOpportunity: (id: string) =>
    request<Opportunity>(`/opportunities/${id}/approve`, { method: 'POST' }),

  rejectOpportunity: (id: string) =>
    request<Opportunity>(`/opportunities/${id}/reject`, { method: 'POST' }),

  // Sources
  sources: () => request<Source[]>('/sources'),
  triggerCrawl: (sourceId: string) =>
    request<{ message: string }>(`/sources/${sourceId}/crawl`, { method: 'POST' }),

  // Reviews
  reviews: (status?: string) => {
    const query = status ? `?status=${status}` : ''
    return request<Review[]>(`/reviews${query}`)
  },

  decideReview: (id: string, decision: string, notes?: string) =>
    request<Review>(`/reviews/${id}/decide`, {
      method: 'POST',
      body: JSON.stringify({ decision, notes }),
    }),

  // Offers
  strategies: () => request<OfferStrategy[]>('/offers/strategies'),

  createStrategy: (data: StrategyCreate) =>
    request<OfferStrategy>('/offers/strategies', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStrategy: (id: string, data: Partial<StrategyCreate> & { is_active?: boolean }) =>
    request<OfferStrategy>(`/offers/strategies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteStrategy: (id: string) =>
    request<void>(`/offers/strategies/${id}`, { method: 'DELETE' }),

  simulateOffer: (data: { listed_price: number; condition: string }) =>
    request<SimulateResponse>('/offers/simulate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Health
  healthDetailed: () => request<{ status: string; checks: Record<string, string> }>('/health/detailed'),
}

// Types
export interface DashboardStats {
  total_opportunities: number
  buy_count: number
  review_count: number
  ignore_count: number
  avg_deal_score: number | null
  avg_margin: number | null
  pending_reviews: number
  active_sources: number
}

export interface Opportunity {
  id: string
  platform: string
  listing_title: string
  source_listing_id: string
  url: string
  model_name: string | null
  listed_price: number
  estimated_market_value: number | null
  estimated_resale_value: number | null
  offer_percentage: number | null
  offer_amount: number | null
  expected_margin: number | null
  expected_margin_pct: number | null
  confidence_score: number | null
  risk_score: number | null
  deal_score: number | null
  recommendation: string
  status: string
  created_at: string
  updated_at: string
}

export interface OpportunityListResponse {
  data: Opportunity[]
  meta: { total: number; page: number; per_page: number; total_pages: number }
}

export interface Source {
  id: string
  name: string
  display_name: string
  marketplace: string
  country: string
  base_url: string
  is_active: boolean
  crawl_interval_minutes: number
  last_crawl_at: string | null
  health_status: string
}

export interface Review {
  id: string
  opportunity_id: string
  reason: string
  status: string
  decision_notes: string | null
  decided_by: string | null
  decided_at: string | null
  created_at: string
}

export interface OfferStrategy {
  id: string
  name: string
  source_id: string | null
  model_id: string | null
  brand_id: string | null
  condition: string | null
  default_offer_pct: number
  min_offer_pct: number
  max_offer_pct: number
  priority: number
  is_active: boolean
}

export interface StrategyCreate {
  name: string
  default_offer_pct: number
  min_offer_pct: number
  max_offer_pct: number
  priority: number
  condition?: string | null
}

export interface SimulateResponse {
  listed_price: number
  offer_percentage: number
  offer_amount: number
  estimated_margin: number
}

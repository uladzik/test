# Import all connectors to trigger registration
from app.connectors.vinted.connector import VintedConnector  # noqa: F401
from app.connectors.kleinanzeigen.connector import KleinanzeigenConnector  # noqa: F401
from app.connectors.depop.connector import DepopConnector  # noqa: F401
from app.connectors.vestiaire.connector import VestiaireConnector  # noqa: F401

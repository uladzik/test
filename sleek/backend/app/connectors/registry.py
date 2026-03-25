from app.connectors.base import BaseConnector


class ConnectorRegistry:
    _connectors: dict[str, type[BaseConnector]] = {}

    @classmethod
    def register(cls, name: str):
        def decorator(connector_cls: type[BaseConnector]):
            cls._connectors[name] = connector_cls
            return connector_cls
        return decorator

    @classmethod
    def get(cls, name: str, **kwargs) -> BaseConnector:
        if name not in cls._connectors:
            raise ValueError(f"Connector '{name}' not registered. Available: {list(cls._connectors.keys())}")
        return cls._connectors[name](**kwargs)

    @classmethod
    def list_all(cls) -> list[str]:
        return list(cls._connectors.keys())

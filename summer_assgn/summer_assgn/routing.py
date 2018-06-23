from channels.routing import ProtocolTypeRouter,URLRouter
from channels.auth import AuthMiddlewareStack
import stream.routing
application= ProtocolTypeRouter({
    'websocket':AuthMiddlewareStack(
        URLRouter(
            stream.routing.websocket_urlpatterns
            )
        ),
    })

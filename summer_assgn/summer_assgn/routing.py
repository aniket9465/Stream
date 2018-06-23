from channels.routing import ProtocolTypeRouter,URLRouter
from channels.auth import AuthMiddlewareStack
import steam.routing
application= ProtocolTypeRouter({
    'websocket':AuthMiddlewareStack(
        URLRouter(
            steam.routing.websocket_urlpatterns
            )
        ),
    })

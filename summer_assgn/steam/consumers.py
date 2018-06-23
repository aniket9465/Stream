from channels.generic.websocket import WebsocketConsumer

class onlinehosts(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send(text_data="hello")
    def disconnect(self,close_code):
        pass
    def receive(self):
        pass

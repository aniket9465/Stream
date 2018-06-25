from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
class onlinehosts(WebsocketConsumer):
    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)("onlineuserrequest",self.channel_name)
        self.send(text_data="hello")
    def disconnect(self,close_code):
        print(self.channel_layer)
        async_to_sync(self.channel_layer.group_discard)("onlineuserrequest",self.channel_name)
        print(self.channel_layer)
        pass
    def receive(self):
        pass
    def sendrefresh(self,event):
        print("hiii")
        self.send(text_data=event["text"])
        pass

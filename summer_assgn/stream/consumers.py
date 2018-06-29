from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from pprint import pprint
from inspect import getmembers
import json
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

class videoplayer(WebsocketConsumer):
    def connect(self):
        self.accept()
        username=str(self.scope['query_string'],"utf-8")
        print(username)
        pprint(self.scope)
        async_to_sync(self.channel_layer.group_add)(username,self.channel_name)
    def disconnect(self,close_code):
        username=str(self.scope['query_string'],"utf-8")
        async_to_sync(self.channel_layer.group_discard)(username,self.channel_name)
        pass
    def receive(self,text_data):
        data=json.loads(text_data)
        async_to_sync(self.channel_layer.group_send)(data['user'],{'type':'sendvideoid','text':data['videoid']})
        pass
    def sendvideoid(self,event):
        self.send(text_data=event['text'])
        print(event)
        pass

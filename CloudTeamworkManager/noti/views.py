from django.shortcuts import render, HttpResponse
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth.models import User
from notifications.signals import notify
from notifications.models import Notification
import json


# 类型定义: 1是系统消息，2是组内消息
@login_required
def delete_all_read(request):
    notifications = request.user.notifications.read()
    notifications.delete()
    return JsonResponse({"tip": "操作成功", "status": 200}, safe=False)

@login_required
def delete_target(request, notification_id):
    notification = Notification.objects.filter(id = notification_id)
    if request.user.id == notification[0].recipient.id:
        notification.delete()
        return JsonResponse({"tip": "操作成功", "status": 200}, safe=False)
    else:
        return JsonResponse({"tip": "权限不足", "status": 400}, safe=False)

@login_required
def get_read(request):
    notifications = request.user.notifications.read()
    notifications = notifications.values('id', 'actor_content_type', 'verb', 'description', 'timestamp')
    return JsonResponse(list(notifications), safe=False)

@login_required
def get_unread(request):
    notifications = request.user.notifications.unread()
    notifications = notifications.values('id', 'actor_content_type', 'verb', 'description', 'timestamp')
    return JsonResponse(list(notifications), safe=False)

@login_required
def mark_all_as_read(request):
    request.user.notifications.unread().mark_all_as_read()
    return JsonResponse({"tip": "操作成功", "status": 200}, safe=False)

@login_required
def mark_target_as_read(request, notification_id):
    notification = Notification.objects.get(id = notification_id)
    if request.user.id == notification.recipient.id:
        notification.mark_as_read()
        return JsonResponse({"tip": "操作成功", "status": 200}, safe=False)
    else:
        return JsonResponse({"tip": "权限不足", "status": 400}, safe=False)

@login_required
def notifications(request):
    read = list(request.user.notifications.read().values('data', 'verb', 'description', 'timestamp','id'))
    for i in read:
        i['timestamp'] = str(i['timestamp'])[:-7]
    unread = list(request.user.notifications.unread().values('data', 'verb', 'description', 'timestamp','id',))
    for i in unread:
        i['timestamp'] = str(i['timestamp'])[:-7]
    return JsonResponse({"info": {"read": read, "unread": unread}, "status": 200}, safe=False)

def send_test(request, type):
    actor = request.user
    notify.send(actor, recipient=actor, verb='你好鸭，这是测试通知', description = "这是的是通知的正文部分", type=type)
    return HttpResponse("ok")

@login_required
def get_target_type(request, type): 
    unread = request.user.notifications.unread()
    read = request.user.notifications.read()

    unread = unread.filter(data={"type": type})
    read = read.filter(data={"type": type})

    unread = list(unread.values('id', 'data', 'verb', 'description', 'timestamp'))
    read = list(read.values('id', 'data', 'verb', 'description', 'timestamp'))

    for i in read:
        i['timestamp'] = str(i['timestamp'])[:-7]

    for i in unread:
        i['timestamp'] = str(i['timestamp'])[:-7]

    return JsonResponse({"content": {"unread": unread, "read": read}, "status": 200}, safe=False)

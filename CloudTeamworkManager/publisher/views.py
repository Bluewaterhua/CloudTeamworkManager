from CloudTeamworkManager.total_class import user, member, _publisher, task
from django.shortcuts import render


def task_progress(request, task_id):
    target_task = task(task_id = task_id)

    if request.method == "GET":
        return target_task.view_task_progress(request)

    if request.method == "POST":
        return target_task.edit_task_progress(request)

def task_comment(request, task_id):
    target_task = task(task_id = task_id)

    if request.method == "GET":
        return target_task.view_task_comment(request)

    if request.method == "POST":
        return target_task.edit_task_comment(request)

def task_shedule(request, task_id):
    target_task = task(task_id = task_id)

    if request.method == "GET":
        return target_task.view_task_shedule(request)

    if request.method == "POST":
        return target_task.edit_task_shedule(request)

def personal_comments(request, task_id, member_id):
    target_task = task(task_id = task_id)
    target_member = member(user_id = member_id, target_task = target_task.task)

    if request.method == "GET":
        return target_member.view_personal_comments(request)

    if request.method == "POST":
        return target_member.edit_personal_comments(request)

def personal_shedule(request, task_id, member_id):
    target_task = task(task_id = task_id)
    target_member = member(user_id = member_id, target_task = target_task.task)

    if request.method == "GET":
        return target_member.view_personal_shedule(request)

    if request.method == "POST":
        return target_member.edit_personal_shedule(request)

def personal_progress(request, task_id, member_id):
    target_task = task(task_id = task_id)
    target_member = member(user_id = member_id, target_task = target_task.task)

    if request.method == "GET":
        return target_member.view_personal_progress(request)

    if request.method == "POST":
        return target_member.edit_personal_progress(request)

def publisher(request):
    return render(request, "publisher.html")
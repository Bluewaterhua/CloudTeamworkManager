# Generated by Django 2.2 on 2019-08-06 15:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='task',
            options={'permissions': {('edit_appendix', '编辑附件'), ('view_personal_comments', '查看个人评价'), ('glance_over_task_details', '浏览任务详情'), ('edit_task_shedule', '编辑任务时间表'), ('delete_appendix', '删除附件'), ('edit_task_comments', '编辑任务评价'), ('view_personal_shedule', '查看个人时间表'), ('view_personal_progress', '查看个人进度'), ('create_tasks', '新建任务'), ('edit_task_progress', '编辑任务进度'), ('edit_personal_comments', '编辑个人评价'), ('edit_task', '编辑任务')}},
        ),
    ]

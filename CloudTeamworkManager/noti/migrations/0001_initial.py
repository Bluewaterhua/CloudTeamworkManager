# Generated by Django 2.2 on 2019-08-18 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Noti',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('publish_data', models.DateTimeField(verbose_name='发布日期')),
                ('content', models.CharField(max_length=500, verbose_name='内容')),
                ('title', models.CharField(max_length=100, verbose_name='标题')),
                ('type', models.CharField(choices=[('0', '全站消息'), ('1', '组内消息'), ('2', '个人消息')], default='2', max_length=1, verbose_name='消息类型')),
                ('receiver', models.CharField(max_length=100, verbose_name='接收者')),
                ('sender', models.CharField(choices=[('0', '管理员'), ('1', '副组长'), ('2', '系统')], max_length=1, verbose_name='发布者')),
            ],
            options={
                'verbose_name': '站内消息',
                'verbose_name_plural': '站内消息',
            },
        ),
    ]

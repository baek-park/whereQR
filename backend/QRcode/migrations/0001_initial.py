# Generated by Django 4.0.3 on 2022-03-24 12:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='QRcode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.TextField()),
                ('is_null', models.BooleanField(default=True)),
                ('qr_url', models.TextField(max_length=255)),
                ('text', models.TextField(null=True)),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Account.profile')),
            ],
        ),
    ]

# Generated by Django 5.0.2 on 2024-03-12 12:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'Categories',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userType', models.IntegerField()),
                ('mail', models.EmailField(max_length=100)),
                ('username', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'User',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=500)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rate', models.DecimalField(decimal_places=1, max_digits=3)),
                ('count', models.IntegerField()),
                ('image', models.ImageField(max_length=200, upload_to='productsImages/')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='commerce.categories')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='commerce.user')),
            ],
            options={
                'db_table': 'Products',
                'ordering': ['id'],
            },
        ),
    ]

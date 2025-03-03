# React + Vite

# Todo App

Todo App پروژه‌ای برای مدیریت کارهای روزانه با استفاده از React.js

## ویژگی‌ها
- اضافه کردن تسک جدید
- حذف تسک
- ویرایش تسک
- ذخیره‌سازی در Local Storage

## نصب و اجرا
```bash
git clone https://github.com/nedafadaeee/TodoApp.git
cd TodoApp
npm install
npm start

## API
این پروژه از **mockapi.io** برای دریافت و ارسال داده‌ها استفاده می‌کند.

### Endpoint‌ها
- `GET /tasks` -> دریافت لیست تسک‌ها
- `POST /tasks` -> اضافه کردن تسک جدید
- `PUT /tasks/:id` -> ویرایش تسک
- `DELETE /tasks/:id` -> حذف تسک

### نحوه ارتباط
برای ارسال درخواست‌ها از متد **fetch** در جاوااسکریپت استفاده شده است.

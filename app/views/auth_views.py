from flask import Blueprint, request, session, url_for, render_template, redirect, flash
from app import db
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from app.models import User
from app.forms import RegisterForm, LoginForm

bp = Blueprint('auth', __name__, template_folder='templates', static_folder='static')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    form = RegisterForm()

    if request.method == 'POST' and form.validate_on_submit():
        user = User.query.filter(User.email == form.email.data).first()
        
        if user is not None:
            flash( f"{user.email}은 이미 등록된 계정입니다.", category="email_error" )
        else:
            new_user = User(fullname = form.name.data, 
                            email = form.email.data, 
                            password = generate_password_hash(form.password.data))
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('.login'))

    return render_template('register.html', form=form)


@bp.route('/login', methods=('GET', 'POST'))
def login():
    form = LoginForm()
    
    if request.method == 'POST' and form.validate_on_submit():
        user = User.query.filter(User.email == form.email.data).first()
        
        if user is None:
            flash("등록되지 않은 계정입니다.", category="email_error")
        elif not check_password_hash(user.password, form.password.data):
            flash("비밀번호가 올바르지 않습니다.", category="pw_error")
        else:
            session['user_id'] = user.id
            return render_template('index.html')

    return render_template('login.html', form=form)


@bp.route('/logout')
def logout():
    session.pop('user_id', None)
    return render_template('index.html')

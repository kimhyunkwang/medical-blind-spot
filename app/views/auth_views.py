from flask import Blueprint, request, session, url_for, render_template, redirect, flash
from app import db
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from app.models import User
from app.forms import RegisterForm

bp = Blueprint('auth', __name__, template_folder='templates', static_folder='static')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    form = RegisterForm()

    if request.method == 'POST' and form.validate_on_submit():
        user = User.query.filter(User.email == form.email.data).first()
        
        if user is not None:
            flash( f"{user.email}은 이미 등록된 계정입니다.", category="email_error" )
        else:
            new_user = User(fullname = form.fullname.data, 
                            email = form.email.data, 
                            password = generate_password_hash(form.password.data))
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('.login'))

    return render_template('register.html', form=form)

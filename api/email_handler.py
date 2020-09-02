from flask import Flask, render_template, flash, request
from wtforms import Form, TextField, TextAreaField, validators, StringField, SubmitField

# App config.
DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'

class ReusableForm(Form):
    email = TextField('Email:', validators=[validators.required(), validators.Length(min=6, max=35)])
    
    @app.route("/", methods=['GET', 'POST'])
    def mail(self):
        form = ReusableForm(request.form)
    
        print (form.errors)
        if request.method == 'POST':
            email=request.form['email']
            print (email, " ")
    
        if form.validate():
        # Save the comment here.
            flash('Booking was succesful ' + email)
        else:
            flash('Error: All the form fields are required. ')
    
        return render_template('mail.html', form=form)

if __name__ == "__main__":
    app.run()																														
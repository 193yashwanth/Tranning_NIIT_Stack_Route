from flask import Flask, url_for, request, render_template, redirect

app = Flask(__name__)

employees = []


@app.route('/')
def index():
    return render_template('./index.html', employees=employees)


@app.route('/add_employee', methods=['POST'])
def add_employee():
    employee = request.form.get('employee')
    if employee:
        employees.append(employee)
    return redirect(url_for('index'))


@app.route('/delete', methods=['POST'])
def delete():
    employees.pop()
    return redirect(url_for('index'))

@app.route('/clear', methods=['POST'])
def clear():
    employees.clear()
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)

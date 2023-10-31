class Vehicle:
    def _init_(self, make, model):
        self.make = make
        self.model = model

    def display(self):
        print('This vehicle is made by:', self.make)
        print('The vehicle model is:', self.model)

honda = Vehicle('honda', 'ex-showroom')
honda.display()

class Employee:
    def _init_(self, name):
        self.name = name

    def dis(self):
        print('I am working at CGI')

class fsdc(Employee):
    def di(self):
        print('My name is', self.name)

Employee1 = fsdc('roshan')
Employee1.di()
Employee1.dis()
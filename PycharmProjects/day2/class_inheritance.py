class Animal:
    def __init__(self,name):
        self.name=name
    def say(self):
        pass
class Dog(Animal):
    def say(self):
        return('woof')
class Cat(Animal):
    def say(self):
        print('meow')
dog=Dog('vicky')
cat=Cat('wert')
print(f'{dog.name} say: {dog.say()}')
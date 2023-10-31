tuple1 = ("red","blue","black","green")
print("the tuple is ", tuple1)
print("the 2nd colour is ", tuple1[1])
for i in range(len(tuple1)):
    print(i+1,",",tuple1[i])
tuple1[1]="pink"

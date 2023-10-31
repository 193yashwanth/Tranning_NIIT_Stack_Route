a=int(input("enter any number: "))
b=[]
for i in range(1,a+1):
    if a%i==0:
        b.append(i)
print(b)
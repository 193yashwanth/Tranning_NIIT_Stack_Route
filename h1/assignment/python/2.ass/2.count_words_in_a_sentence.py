a=list(map(str,input("enter a sentence : ").split(" ")))
b=set(a)
d=[]
for i in b:
    c=0
    for j in a:
        if i==j:
            c+=1
    d.append(i)
    d.append(c)
print(d)

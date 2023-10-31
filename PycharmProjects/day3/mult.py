a = input("enter any number:")
for i in range(1, 11):
    c = int(a)*int(i)
    print(str(a)+'*'+str(i)+'='+str(c))


a = list(map(str, input("enter any words: ").split()))
a.sort()
print(a)

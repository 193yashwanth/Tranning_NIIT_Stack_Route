def add(a, b):
    return a + b


def sub(a, b):
    return a - b


def mul(a, b):
    return a * b


def div(a, b):
    if b == 0:
        return "Error b=0"
    else:
        return a / b


if __name__ == "__main__":
    print('this script is the main program.')

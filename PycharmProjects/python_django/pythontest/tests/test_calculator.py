import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from  mypackage.calculator import Calculator

# Create an instance of Calculator class for testing
calendar = Calculator()

# Test the add method
def test_addition():
    assert calendar.add(2, 3) == 5
    assert calendar.add(0, 0) == 0
    assert calendar.add(-1, 1) == 0

# Test the subtract method
def test_subtract():
    assert calendar.subtract(5, 3) == 2
    assert calendar.subtract( 0, 0) == 0
    assert calendar.subtract(-1, -1) == 0

# Test the multiply method
def test_multiply():
    assert calendar.multiply(2, 3) == 6
    assert calendar.multiply( 0, 5) == 0
    assert calendar.multiply(-1, -1) == 1

# Test the divide method
def test_divide():
    assert calendar.divide(6, 3) == 2
    assert calendar.divide( 0, 5) == 0
    assert calendar.divide(-6, 2) == -3
def test_divide_by_zero():
    try:
        assert calendar.divide(1, 0)
    except ValueError as e:
        assert str(e) == "Cannot divide by zero!"
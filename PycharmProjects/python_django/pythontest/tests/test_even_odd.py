from mypackage.even_odd import even_is

import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '')))


def test_even_num():
    assert even_is(4) == True
    assert even_is(8) == True
    assert even_is(6) == True


def test_odd_num():
    assert even_is(7) == False
    assert even_is(9) == False
    assert even_is(1) == False


def test_negative_num():
    assert even_is(-4) == True
    assert even_is(-5) == False
    assert even_is(-8) == True


def test_d_num():
    assert even_is(4.0) == True
    assert even_is(9.0) == False
    assert even_is(4.45) == False


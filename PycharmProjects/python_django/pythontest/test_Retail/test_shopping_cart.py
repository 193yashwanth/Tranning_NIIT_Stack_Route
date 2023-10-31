import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '')))

from Retail.product import Product
from Retail.shopping_cart import ShoppingCart

def test_add_item():
    cart = ShoppingCart()
    product = Product("Laptop", 1000)
    cart.add_item(product, 2)
    assert len(cart.items) == 1
    assert cart.items[0]["product"] == product
    assert cart.items[0]["quantity"] == 2

def test_remove_item():
    cart = ShoppingCart()
    product1 = Product("Laptop", 1000)
    product2 = Product("Mouse", 20)
    cart.add_item(product1)
    cart.add_item(product2)
    cart.add_item(product1)
    assert len(cart.items) == 1
    assert cart.items[0]["product"] == product2

def test_calculate_total():
    cart = ShoppingCart()
    product1 = Product("Laptop", 1000)
    product2 = Product("Mouse", 20)
    cart.add_item(product1, 2)
    cart.add_item(product2, 3)
    assert cart.calculate_total() == (1000 * 2) + (20 * 3)
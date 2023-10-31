class ShoppingCart:
    def __init__(self):
        self.items = []

    def add_item(self, product, quantity = 1):
        self.items.append({"product": product, "quantity": quantity})

    def remove_item(self, product):
        for item in self.items:
            if item["product"] == product:
                self.items.remove(item)
                break

    def calculate_total(self):
        total = 0
        for item in self.items:
            total += item["product"].price * item["quantity"]
        return total
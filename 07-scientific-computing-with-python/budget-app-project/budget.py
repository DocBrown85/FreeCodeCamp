class Category:

    category = None
    ledger = None

    def __init__(self, category):
        self.category = category
        self.ledger = []

    def __str__(self):
        pass

    def deposit(self, amount, description=""):
        pass

    def withdraw(self, amount, description=""):
        pass

    def get_balance(self):
        pass

    def transfer(self, amount, a_category):
        pass

    def check_funds(self, amount):
        pass


def create_spend_chart(categories):
    pass

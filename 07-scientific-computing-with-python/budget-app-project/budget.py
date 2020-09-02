class Category:

    category = None
    ledger = None

    def __init__(self, category):
        self.category = category
        self.ledger = []

    def __str__(self):
        return ""

    def deposit(self, amount, description=""):
        self._add_ledger_item(amount, description)

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            amount *= -1
            self._add_ledger_item(amount, description)
            return True
        else:
            return False

    def get_balance(self):
        balance = 0
        for item in self.ledger:
            balance += item["amount"]

        return balance

    def transfer(self, amount, a_category):
        if self.check_funds(amount):
            withdraw_description = "Transfer to {}".format(a_category.get_category())
            self.withdraw(amount, withdraw_description)
            deposit_description = "Transfer from {}".format(self.get_category())
            a_category.deposit(amount, deposit_description)
            return True
        else:
            return False

    def check_funds(self, amount):
        balance = self.get_balance()
        if (balance - amount) >= 0:
            return True
        else:
            return False

    def get_category(self):
        return self.category

    def _add_ledger_item(self, amount, description=""):
        item = {"amount": None, "description": None}

        item["amount"] = amount
        item["description"] = description

        self.ledger.append(item)


def create_spend_chart(categories):
    pass

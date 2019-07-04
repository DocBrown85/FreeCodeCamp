function checkCashRegister(price, cash, cid) {
  let currencyUnits = [
    { name: 'ONE HUNDRED', val: 100.00},
    { name: 'TWENTY', val: 20.00},
    { name: 'TEN', val: 10.00},
    { name: 'FIVE', val: 5.00},
    { name: 'ONE', val: 1.00},
    { name: 'QUARTER', val: 0.25},
    { name: 'DIME', val: 0.10},
    { name: 'NICKEL', val: 0.05},
    { name: 'PENNY', val: 0.01}
  ];

  let result = { status: null, change: [] };
  let change = cash - price;

  let cashRegister = cid.reduce(function(register, item) {
    register.total += item[1];
    register[item[0]] = item[1];
    return register;
  }, { total: 0 });
  console.log(JSON.stringify(cashRegister));

  if (cashRegister.total < change) {
    result.status = 'INSUFFICIENT_FUNDS';
    return result;
  }

  if (cashRegister.total === change) {
    result.status = 'CLOSED';
    result.change = cid;
    return result;
  }

  var change_arr = currencyUnits.reduce(function(acc, curr) {
    var value = 0;

    while (cashRegister[curr.name] > 0 && change >= curr.val) {
      change -= curr.val;
      cashRegister[curr.name] -= curr.val;
      value += curr.val;

      change = Math.round(change * 100) / 100;
    }

    if (value > 0) {
        acc.push([ curr.name, value ]);
    }
    return acc;
  }, []);

  if (change_arr.length < 1 || change > 0) {
    result.status = 'INSUFFICIENT_FUNDS';
    return result;
  }

  result.status = 'OPEN';
  result.change = change_arr;
  return result;

}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

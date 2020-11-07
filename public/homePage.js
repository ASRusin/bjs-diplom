"use strict";

const logout = new LogoutButton();
logout.action = function () {
  const result = ApiConnector.logout((response) => {
    if (response.success === true) {
      location.reload();
    }
  });
};
ApiConnector.current((response) => {
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
  }
});
const rates = new RatesBoard();
const getRates = () => {
  ApiConnector.getStocks((response) => {
    if (response.success === true) {
      rates.clearTable();
      rates.fillTable(response.data);
    }
  });
};
getRates();
setInterval(getRates, 60 * 1000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
    }
    moneyManager.setMessage(response.success, response.error);
  });
};
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
    }
    moneyManager.setMessage(response.success, response.error);
  });
};
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
    }
    moneyManager.setMessage(response.success, response.error);
  });
};

const favorites = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success === true) {
    favorites.clearTable();
    favorites.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});
favorites.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success === true) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
    favorites.setMessage(response.success, response.error);
  });
};
favorites.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success === true) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
    favorites.setMessage(response.success, response.error);
  });
};

export const SELECTORS = {
    // Login
    acceptCookies: { role: 'button', name: 'Tümünü Kabul Et' },
    loginButton: { role: 'button', name: ' Giriş Yap ' },
    loginLink: { role: 'link', name: 'Giriş Yap' },
    googleIframe: 'iframe[title="Google ile Oturum Açma Düğmesi"]',
    googleLogin: { role: 'button', name: 'Google ile oturum açın' },
    emailInput: { role: 'textbox', name: 'Email or phone' },
    passwordInput: { role: 'textbox', name: 'Enter your password' },
    nextButton: { role: 'button', name: 'Next' },

    // Search
    searchBox: { role: 'textbox', name: 'Aramak istediğiniz ürünü yazın' },
    categoriesTab: { role: 'tab', name: 'Kategoriler ' },
    phoneCategory: { role: 'link', name: 'Cep Telefonu (70)' },

    // Product
    smsCloseBtn: '#smsComfirmCloseBtn span',
    favoriteButton: { role: 'link', name: ' Favori' },
    favoriteSuccess: 'Ürün, favori listenize',

    // Account
    accountButton: { role: 'button', name: ' Hesabım ' },
    favoritesLink: { role: 'link', name: 'Favori Ürünlerim' },
    addToCartButton: { role: 'link', name: 'Sepete Ekle' },

    // Cart
    cartLink: { role: 'link', name: ' Sepetim' },
    emptyCartButton: { role: 'link', name: ' Sepeti Boşalt' },
    confirmCartButton: { role: 'button', name: 'Sepeti Onayla ' },
    goToCartButton: { role: 'button', name: 'SEPETE GİT' },

    // Address
    newAddressButton: 'Yeni adres ekle',
    addressForm: {
        recordName: '#AddressRecordName',
        fullName: '#NameandSurname',
        city: '#SelectedCityName',
        district: '#FSelectedTownName',
        neighborhood: '#FSelectedNeighbourhoodName',
        address: '#Address',
        tckn: '#Tckn',
        saveButton: { role: 'button', name: 'KAYDET' },
        okButton: { role: 'button', name: 'Tamam' }
    }
};

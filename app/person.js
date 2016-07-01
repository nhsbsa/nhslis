function Person(
  firstName,
  lastName,
  partner,
  privatePension,
  statePension,
  savings,
  disabilityLivingAllowance,
  attendanceAllowance,
  childTaxCredits,
  homeOwner,
  tennant,
  othersAtHome,
  fullName,
  bankAccount,
  premiumBonds
) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.partner = partner;
  this.privatePension = privatePension;
  this.statePension = statePension;
  this.savings = savings;
  this.disabilityLivingAllowance = disabilityLivingAllowance;
  this.attendanceAllowance = attendanceAllowance;
  this.childTaxCredits = childTaxCredits;
  this.homeOwner = homeOwner;
  this.tennant = tennant;
  this.othersAtHome = othersAtHome;
  this.bankAccount = bankAccount;
  this.premiumBonds = premiumBonds;
}

Person.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

Person.prototype.printPerson = function () {
  console.log(
    this.firstName + "\n" +
      "privatePension = " + this.privatePension + " \n" +
      "statePension = " + this.statePension + " \n" +
      "disabilityLivingAllowance = " + this.disabilityLivingAllowance + " \n" +
      "child tax credits = " + this.childTaxCredits + " \n" +
      "attendanceAllowance = " + this.attendanceAllowance + "\n" +
      "partner = " + this.partner + "\n"
  );
};

Person.prototype.resetBenefits = function () {
  this.disabilityLivingAllowance = false;
  this.attendanceAllowance = false;
  this.personalIndependence = false;
  this.childTaxCredits = false;
  console.log('resetting benefits...');
};

Person.prototype.resetLivingSituation = function () {
  this.homeOwner = false;
  this.tennant = false;
  console.log('resetting living situation...');
};

Person.prototype.resetAccounts = function () {
  this.savings = false;
  this.premiumBonds = false;
  console.log('resetting bank accounts...');
};

Person.prototype.resetPartner = function () {
  this.partner = true;
  console.log('resetting partner status...');
};

Person.prototype.benefitChecker = function (benefits) {
  if (typeof benefits === "string") {
    if (benefits === "aa") {
      this.attendanceAllowance = true;
      console.log("aa");
      return "aa";
    } else if (benefits === "ctc") {
      this.childTaxCredits = true;
      console.log("ctc");
      return "ctc";
    } else if (benefits === "dla") {
      this.disabilityLivingAllowance = true;
      console.log("dla");
      return "dla";
    } else if (benefits === "pip") {
      this.personalIndependence = true;
      console.log("pip");
      return "pip";
    } else {
      console.log("none");
      return "none";
    }
  } else if (typeof benefits === "object") {
    var firstBenefit = null;
    for (var benefit in benefits) {
      if (benefits[benefit] === 'aa') {
        this.attendanceAllowance = true;
        console.log("aa");
        if (firstBenefit === null) {
          firstBenefit = "aa";
        }
      } else if (benefits[benefit] === 'ctc') {
        this.childTaxCredits = true;
        console.log("ctc");
        if (firstBenefit === null) {
          firstBenefit =  "ctc";
        }
      } else if (benefits[benefit] === 'dla') {
        this.disabilityLivingAllowance = true;
        console.log("dla");
        if (firstBenefit === null) {
          firstBenefit =  "dla";
        }
      } else if (benefits[benefit] === 'pip') {
        this.personalIndependence = true;
        console.log("pip");
        if (firstBenefit === null) {
          firstBenefit = "pip";
        }
      } else if (benefits[benefit] === 'none') {
        console.log("none");
        if (firstBenefit === null) {
          firstBenefit = "none";
        }
      }
    }
    return firstBenefit;
  }
};

Person.prototype.savingChecker = function(savings) {
  if (typeof savings === "string") {
    if (savings === "bank") {
      this.bankAccount = true;
      return "bank";
    } else if (savings === "pb") {
      this.premiumBonds = true;
      return "pb";
    } else {
      return "none";
    }
  } else if (typeof savings == "object") {
    var firstSaving = null;
    for (var savingsType in savings) {
      if (savings[savingsType] === 'bank') {
        this.bankAccount = true;
        if (firstSaving === null) {
          firstSaving = "bank";
        }
      } else if (savings[savingsType] === 'pb') {
        this.premiumBonds = true;
        if (firstSaving === null) {
          firstSaving =  "pb";
        }
      } else if (savings[savingsType] === 'none') {
        if (firstSaving === null) {
          firstSaving = "none";
        }
      }
    }
    return firstSaving;
  }
};

function createPerson() {
  return new Person();
}

module.exports.createPerson = createPerson;
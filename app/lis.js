function Lis(
  aboutYouStatus,
  aboutPartnerStatus,
  propertyStatus,
  whereYouLive,
  aboutYouLink,
  aboutPartnerLink,
  propertyLink,
  whereYouLiveLink
) {
    this.aboutYouStatus = aboutYouStatus;
    this.aboutPartnerStatus = aboutPartnerStatus;
    this.propertyStatus = propertyStatus;
    this.whereYouLive = whereYouLive;
    this.aboutYouLink = aboutYouLink;
    this.aboutPartnerLink = aboutPartnerLink;
    this.propertyLink = propertyLink;
    this.whereYouLiveLink = whereYouLiveLink;
};

Lis.prototype.resetApplication = function() {
  this.aboutYouStatus = "Not started";
  this.aboutPartnerStatus = "Not started";
  this.propertyStatus = "Not started";
  this.whereYouLiveStatus = "Not started";
  this.aboutYouLink = "Start";
  this.aboutPartnerLink = "Start";
  this.propertyLink = "Start";
  this.whereYouLiveLink = "Start";
  console.log('Resetting application...');
};

Lis.prototype.allComplete = function () {
  if (this.aboutYouStatus === 'Completed' &&
    this.aboutPartnerStatus === 'Completed' &&
    this.propertyStatus === 'Completed' &&
    this.whereYouLiveStatus === 'Completed') {
      return true;
    } else {
      return false;
    }
};

Lis.prototype.setPartnerText = function (partner) {
  if (partner === false) {
    this.partnerBothText = 'you';
    this.partnerOrText = 'you';
    this.partnerAndText = 'you';
    this.partnersText = 'your';
    this.partnerLiveText = 'Does anyone else live with you?';
    this.jointTennantText = 'Is anyone else a joint tenant of the place you live';
    this.jointOwnerText = 'Is anyone else a joint owner of the property you live in';
    this.otherThanPartner = ' ';
    this.iWe = 'I';
    this.doNot = ' ';
  } else {
    this.partnerBothText = 'you, your partner or both of you';
    this.partnerOrText = 'you or your partner';
    this.partnerAndText = 'you and your partner';
    this.partnersText = "you and your partner's";
    this.partnerLiveText = 'Does anyone else other than your partner live with you?';
    this.jointTennantText = 'Is anyone else other than your partner a joint tenant of the place you live';
    this.jointOwnerText = 'Is anyone else other than your partner a joint owner of the property you live in';
    this.otherThanPartner = 'other than your partner';
    this.iWe = 'we';
    this.doNot = 'do not';
  }
}


function createLIS() {
  return new Lis();
}

module.exports.createLIS = createLIS;
var LIS ={
  aboutYouStatus : "Not started",
  aboutPartnerStatus : "Not started",
  propertyStatus : "Not started",
  whereYouLiveStatus : "Not started",
  aboutYouLink : "Start",
  aboutPartnerLink : "Start",
  propertyLink : "Start",
  whereYouLiveLink : "Start",
  resetApplication : function() {
    aboutYouStatus = "Not started";
    aboutPartnerStatus = "Not started";
    propertyStatus = "Not started";
    whereYouLiveStatus = "Not started";
    aboutYouLink = "Start";
    aboutPartnerLink = "Start";
    propertyLink = "Start";
    whereYouLiveLink = "Start";
    jointOwnerText : 'Is anyone else other than your partner a joint owner of the property you live in',
    console.log('Resetting application...');
  },
  allComplete : function () {
    if (LIS.aboutYouStatus === 'Completed' &&
      LIS.aboutPartnerStatus === 'Completed' &&
      LIS.propertyStatus === 'Completed' &&
      LIS.whereYouLiveStatus === 'Completed') {
      return true;
    } else {
      return false;
    }
  },
  setPartnerText : function (partner) {
    if (partner === false) {
      partnerBothText = 'you';
      partnerOrText = 'you';
      partnerAndText = 'you';
      partnersText = 'your';
      partnerLiveText = 'Does anyone else live with you?';
      jointTennantText = 'Is anyone else a joint tenant of the place you live';
      jointOwnerText = 'Is anyone else a joint owner of the property you live in';
      otherThanPartner = ' ';
      iWe = 'I';
    } else {
      partnerBothText = 'you, your partner or both of you';
      partnerOrText = 'you or your partner';
      partnerAndText = 'you and your partner';
      partnersText = "you and your partner's";
      partnerLiveText = 'Does anyone else other than your partner live with you?';
      jointTennantText = 'Is anyone else other than your partner a joint tenant of the place you live';
      jointOwnerText = 'Is anyone else other than your partner a joint owner of the property you live in';
      otherThanPartner = 'other than your partner';
      iWe = 'we';
    }
  }
}

module.exports.LIS = LIS;
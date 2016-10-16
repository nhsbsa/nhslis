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

function createLIS() {
  return new Lis();
}

module.exports.createLIS = createLIS;
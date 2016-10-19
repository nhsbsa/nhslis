var expect = require('chai').expect;

describe('createPerson', function () {
  var createPerson = require('../app/person').createPerson;
  var applicant;  

  it('should return a new person object', function () {
    applicant = createPerson();  
    expect(applicant).to.be.a('object');
  });
  
  it('it should have a firstName property', function () {
    expect(applicant).to.have.property('firstName');
  });
});

describe('createPerson', function () {
  var createPerson = require('../app/person').createPerson;
  var applicant;  

  it('it should have a firstName property', function () {
    expect(applicant).to.have.property('firstName');
  });
});
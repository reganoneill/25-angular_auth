'use strict';

module.exports = function(){
 return function(galleries, searchTerm){
   let fuzzyRegEx = generateFuzzyRegex(searchTerm);
   return galleries.filter(gallery => {
     return fuzzyRegEx.test(gallery.name.toUpperCase());
   });
 };
};

function generateFuzzyRegex(input){
  if(!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
};

"use strict";

var m = require('mithril');

function controller(mainCtrl)
{
  var ctrl = {
    mainCtrl: mainCtrl
  };

  ctrl.closeChecklist = function()
  {
    ctrl.mainCtrl.checklist = null;
  };


  ctrl.saveChecklist = function()
  {
    m.startComputation();
    ctrl.mainCtrl.checklist.save()
    .then(function() {
      m.endComputation();
    })
    .catch(function(err) {
      console.error(err);
      alert(t('errors.checklist.save'));
      m.endComputation();
    });
  };

  return ctrl;
}

function view(ctrl)
{
  return m('section.header[role="region"]',
    m('header', [
      (ctrl.mainCtrl.checklist) ? [
        m('menu[type="toolbar"]', [
         m('a.button[href="javascript:;"', {
           onclick: ctrl.saveChecklist
         }, t('save'))
        ]),
        m('a[href="javascript:;"', {
          onclick: ctrl.closeChecklist,
          title: t('back')
        }, m('span.icon.icon-back')),
        m('h1', ctrl.mainCtrl.checklist.name)
      ] : m('h1', t('Checklists'))
    ])
  );
}

module.exports = {
  controller: controller,
  view: view
};
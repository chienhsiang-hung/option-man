window.onload = switch_lang('.tw', '.en');

function switch_lang(hide_lan, show_lan){
  $(hide_lan).hide();
  $(show_lan).show();
}
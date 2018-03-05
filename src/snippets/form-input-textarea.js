{% if type == blank %}
  {% assign type = 'text' %}
{% endif %}
{% if autocomplete == blank %}
  {% assign autocomplete = 'off' %}
{% endif %}
{% if autocapitalize == blank %}
  {% assign autocapitalize = 'off' %}
{% endif %}
{% if spellcheck == blank %}
  {% assign spellcheck = 'false' %}
{% endif %}
{% if rows == blank %}
  {% assign rows = '3' %}
{% endif %}
{% if required == blank %}
  {% assign required = 'false' %}
{% endif %}

{%- capture cx -%}
  input-wrapper fill-h
  {{ className }}
{%- endcapture -%}

<div class='{{ cx }}' data-component='input-textarea'>
  <textarea
    class='sans h6 fill-h'
    type='{{ type }}'
    name='{{ name }}'
    placeholder='{{ placeholder }}'
    autocomplete='{{ autocomplete }}'
    autocapitalize='{{ autocapitalize }}'
    spellcheck='{{ spellcheck }}'
    rows='{{ rows }}'
    required='{{ required }}'
  >{{ value }}</textarea>
  <label class='sans caps small'>{{ label }}</label>
  <span></span>
</div>

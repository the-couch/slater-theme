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
{% if required == blank %}
  {% assign required = 'false' %}
{% endif %}

{%- capture id -%}
{{type}}{{name}}{{ className | replace: ' ', '' }}
{%- endcapture -%}

{%- capture cx -%}
  input-wrapper fill-h
  {{ className }}
{%- endcapture -%}

<div class='{{ cx }}' data-component='input-text'>
  <input
    id=''
    class='sans h6 fill-h'
    type='{{ type }}'
    name='{{ name }}'
    placeholder='{{ placeholder }}'
    value='{{ value }}'
    autocomplete='{{ autocomplete }}'
    autocapitalize='{{ autocapitalize }}'
    spellcheck='{{ spellcheck }}'
    required='{{ required }}'
  />
  <label class='sans caps small'>{{ label }}</label>
  <span></span>
</div>

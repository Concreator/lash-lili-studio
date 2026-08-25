# Деплой лендинга Lash Lili

## Архитектура

```
GitHub Pages (docs/)  →  iframe в Тильде
```

## 1. GitHub Pages

- Репо: `https://github.com/Concreator/lash-lili-studio`
- Branch: `master`, папка `/docs`
- URL: `https://concreator.github.io/lash-lili-studio/`
- После `git push`: 1-2 минуты на обновление CDN

## 2. Деплой

```bash
git add docs/ preview.html
git commit -m "Description"
git push
```

## 3. Встраивание в Тильду

### Проблема
Тильда встраивает сайт через iframe с фиксированной высотой → пустота под футером.

### Решение: postMessage

Сайт отправляет реальную высоту страницы, Тильда подстраивает iframe.

**На стороне сайта** (уже в `index.html`):
```html
<script>
(function(){
  function send(){
    if(window.parent && window.parent !== window){
      window.parent.postMessage(JSON.stringify({type:'resize',height:document.documentElement.scrollHeight}),'*');
    }
  }
  send();
  window.addEventListener('load',send);
  window.addEventListener('resize',send);
})();
</script>
```

**На стороне Тильды** (блок «Вставка HTML»):
```html
<iframe id="lash-frame" src="https://concreator.github.io/lash-lili-studio/?v=N" width="100%" height="800" style="border:none;" allowfullscreen></iframe>
<script>
(function(){
  var iframe = document.getElementById('lash-frame');
  window.addEventListener('message', function(e) {
    try {
      var data = JSON.parse(e.data);
      if (data.type === 'resize' && data.height) {
        iframe.style.height = data.height + 'px';
      }
    } catch(err) {}
  });
})();
</script>
```

`?v=N` — cache-buster. Менять N при каждом обновлении.

## 4. Cache-busting

GitHub Pages CDN кеширует файлы. При правках:

1. В `index.html`: менять `style.css?v=N` и `script.js?v=N`
2. В iframe src Тильды: менять `?v=N`
3. После push: подождать 1-2 минуты, потом обновить страницу в Тильде (Ctrl+Shift+R)

## 5. Структура файлов

- `docs/index.html` — страница
- `docs/style.css` — стили (~1210 строк)
- `docs/script.js` — навигация, бургер, прайс, галерея, fade-in (~170 строк)
- `docs/assets/` — фото (studio-1..5.jpg + work-01..20.jpg)
- `preview.html` — локальная обёртка iframe

# Matrix
<h1>Matrix</h1>
Дано M, N, X
<hr />
Подготовка

Создать матрицу M*N (строчки, колонки)
Значение места пресечения — объект с уникальным идентификатором ID и количеством amount: int (3-х значный рандом)

Задание
Найти сумму по каждой строчке M и среднее по каждому столбику N

Вывести результирующие данные в таблицу с хорошим UX не используя фреймворки и библиотеки.

В ячейках выводится amount, ранее автоматически сгенерированный. 
При нажатии на ячейку увеличивать значение amount на 1 и соответственно менять среднее этого столбика и сумму этой строки

При наведении на ячейку подсветить X ячеек, amount которых самый близкий к amount текущей ячейки

При наведении на ячейку суммы по строчке необходимо заменять значение ячеек на процент их вклада в общую сумму и добавить фон: столбик, который наглядно покажет величину процента.
 Фактически закрасить часть ячейки. 

Дать возможность удалить строку с таблицы, при этом должны поменяться средние значения по каждому столбику

Дать возможность добавить строку, фактически M+1. При этом строка заполняется по всем правилам таблицы. 
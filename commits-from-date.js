import { execSync } from 'child_process';

// ==== Настройки ====
const startDate = new Date('1980-06-14'); // дата начала коммитов
const endDate = new Date('2025-10-15'); // сегодня
const commitsPerDay = 1; // сколько коммитов в день

// ==== Генерация коммитов ====
let currentDate = new Date(startDate);

let commitCounter = 1;

while (currentDate <= endDate) {
  for (let i = 0; i < commitsPerDay; i++) {
    const isoDate = currentDate.toISOString();

    // Создаём фиктивное изменение
    execSync(`echo "Commit ${commitCounter}" >> log.txt`);

    // Добавляем изменения
    execSync('git add .');

    // Делаем коммит с указанной датой
    execSync(`git commit -m "commit ${commitCounter}" --date="${isoDate}"`, {
      stdio: 'inherit',
    });

    console.log(`✅ Commit ${commitCounter} at ${isoDate}`);
    commitCounter++;
  }

  // Переходим к следующему дню
  currentDate.setDate(currentDate.getDate() + 1);
}

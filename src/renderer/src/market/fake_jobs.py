import random
import hashlib

file_exts = ["mp4", "mp3", "docx", "pptx", "xlsx", "pdf", "py", "rs"]
file_size_units = ["KiB", "MiB", "GiB", "TiB"]
file_statuses = ["downloading", "paused", "error", "completed"]
file_time_units = ["s", "min", "h", "d"]

def rand_name() -> str:
  sequence = list("aabcdeefghiijklmnoopqrstuuv_")
  random.shuffle(sequence)
  return ''.join(sequence)[:random.randint(3, 15)]

def rand_date() -> str:
  year = ("0000" + str(random.randint(1980, 2023)))[-4:]
  month = ("00" + str(random.randint(1, 12)))[-2:]
  day = ("00" + str(random.randint(1, 28)))[-2:]
  hour = ("00" + str(random.randint(0, 23)))[-2:]
  minute = ("00" + str(random.randint(0, 59)))[-2:]
  second = ("00" + str(random.randint(0, 59)))[-2:]
  return f'{year}-{month}-{day} {hour}:{minute}:{second}'

def main():
  num = int(input("Enter number of jobs: "))
  output = "["
  for i in range(num):
    id = i + 1
    size = random.randint(1, 1023)
    unit = random.choice(file_size_units)
    file_name = f'{rand_name()}.{random.choice(file_exts)}'
    file_size = f'{size} {unit}'
    status = random.choice(file_statuses)
    remaining_time = f'{random.randint(1, 23)} {random.choice(file_time_units)}'
    time_queued = rand_date()

    p_cost = random.randint(3, 29)
    r_cost = random.randint(0, p_cost)
    hash_obj = hashlib.sha256()
    hash_obj.update(file_name.encode())
    hash = hash_obj.hexdigest()
    accumulated_data = f'{random.randint(0, size)}'
    running_cost = f'{r_cost} USD'
    projected_cost = f'{p_cost} USD'

    text = " {"
    text += f'id:"{id}",'
    text += f'fileName:"{file_name}",'
    text += f'fileSize:"{file_size}",'
    text += f'status:"{status}",'
    text += f'remainingTime:"{remaining_time}",'
    text += f'timeQueued:"{time_queued}",'

    text += f'hash:"{hash[:16]}",'
    text += f'accumulatedData:"{accumulated_data}",'
    text += f'runningCost:"{running_cost}",'
    text += f'projectedCost:"{projected_cost}",'
    text += "},"

    output += text
  output +=  " ]"

  print(output)

if __name__ == "__main__":
  main()
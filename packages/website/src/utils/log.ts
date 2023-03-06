const info = (tag: string, ...desc: any) => {
  console.info(
    `%c${tag}:`,
    'display:inline-block;background:#d1d5db;color:black;padding:2px 4px;border-radius:4px',
    ...desc,
  );
};

const log = {
  info,
};
export default log;

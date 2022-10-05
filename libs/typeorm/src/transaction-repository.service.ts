import {
  DataSource,
  EntityManager,
  EntityTarget,
  QueryRunner,
  Repository,
} from 'typeorm';

export class TransactionRepository<T> extends Repository<T> {
  constructor(
    private readonly dataSource: DataSource,
    target: EntityTarget<T>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(target, manager, queryRunner);
  }

  async transaction<K>(
    callback: (queryRunner: QueryRunner) => Promise<K>,
    options?: {
      startHook: () => Promise<never>;
      commitHook: () => Promise<never>;
      rollbackHook: () => Promise<never>;
    },
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    let result: K;

    try {
      await queryRunner.connect();

      if (options && options.startHook) {
        await options.startHook();
      }
      await queryRunner.startTransaction();

      result = await callback(queryRunner);

      await queryRunner.commitTransaction();
      if (options && options.commitHook) {
        await options.commitHook();
      }
    } catch (e) {
      await queryRunner.rollbackTransaction();
      if (options && options.rollbackHook) {
        await options.rollbackHook();
      }
    } finally {
      await queryRunner.release();
    }

    return result;
  }
}

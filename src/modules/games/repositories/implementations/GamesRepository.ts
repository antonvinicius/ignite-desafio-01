import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository.query(`SELECT * FROM games WHERE title ILIKE '%${param}%'`)
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("SELECT COUNT(id) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await this.repository.findOne({
      where: {
        id
      },
      relations: ['users']
    })

    if (!game) return []

    return game?.users
  }
}

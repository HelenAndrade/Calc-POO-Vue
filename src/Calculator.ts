import { Operation } from './Operation'

export class Calculator {
  private _numA: number = 0
  private _numB: number = 0
  private _operation: Operation | null = null

  public getNumA(): number {
    return this._numA
  }

  public getNumB(): number {
    return this._numB
  }

  public setNumA(num: number): void {
    this._numA = num
  }

  public setNumB(num: number): void {
    this._numB = num
  }

  public setOperation(operation: Operation): void {
    this._operation = operation
  }

  public calculate(): number {
    if (this._operation === null) {
      throw new Error('Nenhuma operação definida')
    }
    switch (this._operation) {
      case Operation.ADD:
        return this._numA + this._numB
      case Operation.SUBTRACT:
        return this._numA - this._numB
      case Operation.MULTIPLY:
        return this._numA * this._numB
      case Operation.DIVIDE:
        if (this._numB === 0) {
          throw new Error('Divisão por zero não é permitida')
        }
        return this._numA / this._numB
      default:
        throw new Error('Operação desconhecida')
    }
  }
}

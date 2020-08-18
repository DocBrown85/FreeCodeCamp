class ArithmeticArranger:
    class ArtithmeticProblem:
        def __init__(self, problemString):
            self._operand0 = None
            self._operand1 = None
            self._operator = None
            self._solution = None
            self._parse(problemString)

        def _parse(self, problemString):
            chunks = problemString.split(" ")

            if len(chunks) != 3:
                raise RuntimeError("Error: Invalid arithmetic problem format.")

            operand0 = chunks[0]
            operand1 = chunks[2]
            operator = chunks[1]

            self._hasOnlyDigits(operand0)
            self._hasAtMostNDigits(
                operand0, 4, "Error: Numbers cannot be more than four digits."
            )

            self._hasOnlyDigits(operand1)
            self._hasAtMostNDigits(
                operand1, 4, "Error: Numbers cannot be more than four digits."
            )

            self._isAllowedOperator(operator)

            self._operand0 = operand0
            self._operand1 = operand1
            self._operator = operator

        def solve(self):
            self._solution = eval(
                "{} {} {}".format(self._operand0, self._operator, self._operand1)
            )

        def arrange(self):
            maxDigits = max([len(self._operand0), len(self._operand1)])
            totalCharacters = maxDigits + 2
            arrangedProblem = ""
            arrangedProblem += "{}".format(self._operand0).rjust(totalCharacters) + "\n"
            arrangedProblem += (
                "{}".format(self._operand1).rjust(totalCharacters)
            ).replace(" ", "" + self._operator, 1) + "\n"
            arrangedProblem += "".rjust(totalCharacters, "-")
            if self._solution:
                arrangedProblem += "\n"
                arrangedProblem += "{}".format(self._solution).rjust(totalCharacters)

            return arrangedProblem

        def _hasOnlyDigits(self, operand):
            if not operand.isdecimal():
                raise RuntimeError("Error: Numbers must only contain digits.")

        def _hasAtMostNDigits(self, operand, numberOfDigits, errorMessage):
            if len(operand) > numberOfDigits:
                raise RuntimeError(errorMessage)

        def _isAllowedOperator(self, operator):
            if operator not in ["+", "-"]:
                raise RuntimeError("Error: Operator must be '+' or '-'.")

    def __init__(self, problems, computeSolutions=False):
        if len(problems) > 5:
            raise RuntimeError("Error: Too many problems.")
        self._rawProblems = problems
        self._computeSolutions = computeSolutions

    def arrange(self):
        arrangedProblemsList = []
        for rawProblem in self._rawProblems:
            arrangedProblem = self._arrangeProblem(rawProblem)
            arrangedProblemsList.append(arrangedProblem)

        arrangedProblems = self._mergeArrangedProblemsList(arrangedProblemsList)

        return arrangedProblems

    def _arrangeProblem(self, rawProblem):
        arithmeticProblem = self.ArtithmeticProblem(rawProblem)
        if self._computeSolutions:
            arithmeticProblem.solve()
        arrangedProblem = arithmeticProblem.arrange()
        return arrangedProblem

    def _mergeArrangedProblemsList(self, arrangedProblemsList):
        chunkedProblems = []
        for problem in arrangedProblemsList:
            chunkedProblems.append(problem.split("\n"))

        arrangedProblemsChunks = []
        chunkedProblemSize = len(chunkedProblems[0])
        for i in range(0, chunkedProblemSize):
            chunks_i = [x[i] for x in chunkedProblems]
            arrangedProblemsChunks.append("    ".join(chunks_i))

        arrangedProblems = "\n".join(arrangedProblemsChunks)

        return arrangedProblems


def arithmetic_arranger(problems, computeSolutions=False):
    try:
        arithmeticArranger = ArithmeticArranger(
            problems, computeSolutions=computeSolutions
        )
        arranged_problems = arithmeticArranger.arrange()
        return arranged_problems
    except Exception as e:
        return str(e)
